const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const db = require("_helpers/db");
const User = db.User;
const Tokens = db.Tokens;
const emailCheck = require('email-check');
const {sendEmail} = require('_helpers/tools');

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  authenticate,
  getUserPlaylistSongs,
  updateUserPlaylistSongs,
  deleteUserPlaylistSongs,
  getUserPlaylistSongsLeftById,
  updateUserPlaylistSongsSwipLeft,
  verify,
};

async function authenticate(userAuthentification) {
  try {
    var user = await User.findOne({ $or: [{ username: userAuthentification.username }, { email: userAuthentification.username }] });
    const comparePassword = await bcrypt.compare(userAuthentification.password, user.password);
    if (comparePassword) {
      // Make sure the user has been verified
      //if (!user.isVerified) return res.status(401).json({ type: 'not-verified', message: 'Your account has not been verified.' });
      
      const token = jwt.sign({ sub: user._id }, config.secret, {
        expiresIn: "7d",
      });
      return {
        ...user.toJSON(),
        token,
      };
    } else {
      throw "Wrong username or password.";
    }

  } catch (error) {
    throw "Wrong username or password.";

  }


}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  return await User.findById(id);
}

async function create(userParam, req, res) {
  try {
    // validate
    if (await User.findOne({ username: userParam.username })) {
      throw 'Username "' + userParam.username + '" is already taken';
    }
    if (await User.findOne({ email: userParam.email })) {
      throw 'Email "' + userParam.email + '" is already taken';
    }
    // tester mail
    if (!isValidEmail(userParam.email) || userParam.email == '') {
      throw 'Email is invalid';
    }
    if (!emailCheck(userParam.email)) {
      throw 'Email do not exist';
    }
    // test password
    if (isValidatePassword(userParam.password) == false || userParam.password == '') {
      throw 'Password is invalid';
    }
    userParam.password = bcrypt.hashSync(userParam.password);
    // create User
    const user = new User(userParam);
    // save user
    const user_ = await user.save();

    await sendVerificationEmail(user_, req, res);
    
  } catch (error) {
      res.status(500).json({message: error.message})
  }
}

async function update(id, userParam) {
  const user = await User.findById(id);
  // validate
  if (!user) throw "User not found";
  // hash password if it was entered
  if (userParam.password) {
    // verify new password
    if (isValidatePassword(userParam.password)) {
      userParam.hash = bcrypt.hashSync(userParam.password, 10);
    } else {
      throw 'Password is invalid, you need to have 1 Maj, 1 Min, 1 Number and 1 Caracter special';
    }
  }
  // copy userParam properties to user
  Object.assign(user, userParam);
  await user.save();
}
// recuperer la playlist de l'utilisateur connecté
async function getUserPlaylistSongs(id){
  const user = await User.findById(id);
  return user.playlistIdSongs;
}
// recuperer la list de l'utilisateur connecté swipé à gauche
async function getUserPlaylistSongsLeftById(id){
  const user = await User.findById(id);
  return user.listIdSongsSwiptoLeft;
}
// update la playlist utilisateur quand il ajoute une musique
async function updateUserPlaylistSongsSwipLeft(id,param){
  const user = await User.findById(id);
  user.listIdSongsSwiptoLeft.push(param.idMusic)
  user.save();
  return user.toJSON();
}
// update la playlist utilisateur quand il ajoute une musique
async function updateUserPlaylistSongs(id,param){
  const user = await User.findById(id);
  user.playlistIdSongs.push(param.idMusic)
  user.save();
  return user.toJSON();
}
async function deleteUserPlaylistSongs(id,param){
  
  var listSongToRemove = param.idMusic.map(s => s.toString());
  await User.updateOne( // select your doc in moongo
  {_id: id}, // your query, usually match by _id
  { $pullAll: { playlistIdSongs : listSongToRemove } }, // item(s) to match from array you want to pull/remove
  { multi: true } // set this to true if you want to remove multiple elements.
  )
}
async function _delete(id) {
  await User.findByIdAndRemove(id);
}
function isValidEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}
function isValidatePassword(password) {
  var newPassword = password;
  var minNumberofChars = 8;
  var maxNumberofChars = 16;
  var regularExpression = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,16})')
  if (newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars) {
    return false;

  }
  if (!regularExpression.test(String(newPassword))) {
    return false;

  }
  return true;
}


// ===EMAIL VERIFICATION
// @route GET api/verify/:token
// @desc Verify token
// @access Public
async function verify(req, res){
  console.log("hello")
  if(!req.params.token) return res.status(400).json({message: "We were unable to find a user for this token."});

  try {
      // Find a matching token
      const token = await Tokens.findOne({ token: req.params.token });

      if (!token) return res.status(400).json({ message: 'We were unable to find a valid token. Your token my have expired.' });

      // If we found a token, find a matching user
      User.findOne({ _id: token.userId }, (err, user) => {
          if (!user) return res.status(400).json({ message: 'We were unable to find a user for this token.' });

          if (user.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });

          // Verify and save the user
          user.isVerified = true;
          user.save(function (err) {
              if (err) return res.status(500).json({message:err.message});

              res.status(200).send("The account has been verified. Please log in.");
          });
      });
  } catch (error) {
      res.status(500).json({message: error.message})
  }
};

// @route POST api/resend
// @desc Resend Verification Token
// @access Public
exports.resendToken = async (req, res) => {
  try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

      if (user.isVerified) return res.status(400).json({ message: 'This account has already been verified. Please log in.'});

      await sendVerificationEmail(user, req, res);
  } catch (error) {
      res.status(500).json({message: error.message})
  }
};

async function sendVerificationEmail(user, req, res){
  try{
      let payload = {
        userId:  user._id,
        token: crypto.randomBytes(20).toString('hex')
      };
      const token = new Tokens(payload);
      // Save the verification token
      await token.save();

      let subject = "Account Verification Token";
      let to = user.email;
      let from = process.env.FROM_EMAIL;
      let link="http://"+req.headers.host+"/users/verify/"+token.token;
      let html = `<head>
                  <meta http-equiv="content-type" content="text/html; charset=utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
                  <meta name="format-detection" content="telephone=no" />
                
                  <style>
                    /* Reset styles */
                    body {
                      margin: 0;
                      padding: 0;
                      min-width: 100%;
                      width: 100% !important;
                      height: 100% !important;
                    }
                
                    body,
                    table,
                    td,
                    div,
                    p,
                    a {
                      -webkit-font-smoothing: antialiased;
                      text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                      -webkit-text-size-adjust: 100%;
                      line-height: 100%;
                    }
                
                    table,
                    td {
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse !important;
                      border-spacing: 0;
                    }
                
                    img {
                      border: 0;
                      line-height: 100%;
                      outline: none;
                      text-decoration: none;
                      -ms-interpolation-mode: bicubic;
                    }
                
                    #outlook a {
                      padding: 0;
                    }
                
                    .ReadMsgBody {
                      width: 100%;
                    }
                
                    .ExternalClass {
                      width: 100%;
                    }
                
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                      line-height: 100%;
                    }
                
                    @media all and (min-width: 560px) {
                      body {
                        margin-top: 30px;
                      }
                    }
                    
                    /* Rounded corners */
                    @media all and (min-width: 560px) {
                      .container {
                        border-radius: 8px;
                        -webkit-border-radius: 8px;
                        -moz-border-radius: 8px;
                        -khtml-border-radius: 8px;
                      }
                    }
                    /* Links */
                    a,
                    a:hover {
                      color: #127DB3;
                    }
                
                    .footer a,
                    .footer a:hover {
                      color: #999999;
                    }
                  </style>
                
                  <!-- MESSAGE SUBJECT -->
                  <title>Confirm email template</title>
                
                </head>
                
                <!-- BODY -->
                <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0;  padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
                  background-color: #F0F0F0;
                  color: #000000;" bgcolor="#F0F0F0" text="#000000">
                  <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background">
                    <tr>
                      <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;" bgcolor="#F0F0F0">
                        <table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#FFFFFF" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
                  max-width: 560px;" class="container">
                          <tr>
                            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
                      padding-top: 25px;
                      color: #000000;
                      font-family: sans-serif;" class="header">
                              <img border="0" vspace="0" hspace="0" src="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" width="200" height="58" alt="The Idea" title="The Idea" />
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                      padding-top: 25px;" class="line">
                              <hr color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                      padding-top: 25px; 
                      color: #000000;
                      font-family: sans-serif;" class="paragraph">
                              Hi ${user.username},<br> In order to start using your new account, you need to confirm your email address.
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                      padding-top: 25px;
                      padding-bottom: 5px;" class="button">
                              <a href="${link}" target="_blank" style="text-decoration: underline;">
                                <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                                  <tr>
                                    <td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                                        bgcolor="#3969d5"><a target="_blank" style="text-decoration: underline;
                          color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;" href="${link}">
                            Verify Email Address
                          </a>
                                    </td>
                                  </tr>
                                </table>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                      padding-top: 25px;" class="line">
                              <hr color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                      padding-top: 20px;
                      padding-bottom: 25px;
                      color: #000000;
                      font-family: sans-serif;" class="paragraph">
                              If you did not sign up for this account you can ignore this email and the account will be deleted.
                            </td>
                          </tr>
                        </table>
                        <table border="0" cellpadding="0" cellspacing="0" align="center" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
                  max-width: 560px;" class="wrapper">
                          <tr>
                            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
                      padding-top: 20px;
                      padding-bottom: 20px;
                      color: #999999;
                      font-family: sans-serif;" class="footer">
                              Check out our extensive <a href="https://admin-qa.dideea.com/" target="_blank" style="text-decoration: underline; color: #999999; font-family: sans-serif; font-size: 13px; font-weight: 400; line-height: 150%;">FAQ</a> for more information
                              or contact us through our <a href="https://admin-qa.dideea.com/" target="_blank" style="text-decoration: underline; color: #999999; font-family: sans-serif; font-size: 13px; font-weight: 400; line-height: 150%;">Contact Form</a>. Our support
                              team is available to help you 24 hours a day, seven days a week.
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>`;

      await sendEmail({to, from, subject, html});
      res.status(200).json({message: 'A verification email has been sent to ' + user.email + '.'});
  }catch (error) {
      res.status(500).json({message: error.message})
  }
}