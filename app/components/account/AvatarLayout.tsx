import * as React from 'react';
import { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { songService} from '../../services/music.service';

import BronzeVinyl from '../../asset/rewards/bronze-vinyl.svg';
import SilverVinyl from '../../asset/rewards/silver-vinyl.svg';
import GoldVinyl from '../../asset/rewards/gold-vinyl.svg';
import PlatinumVinyl from '../../asset/rewards/platinum-vinyl.svg';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const [Bronze, Silver, Gold, Platinum] = [BronzeVinyl.src, SilverVinyl.src, GoldVinyl.src, PlatinumVinyl.src];

interface Props {
    readonly user?: any;
    readonly withBadge?: boolean;
}

const AvatarLayout: React.FC<Props> = ({ user , withBadge}) => {
  const levels = [25, 50, 75, 100];
  const [levelImg, setLevelImg] = React.useState(Bronze);

  useEffect(() => {
    (async() => {
        const addedSongs = (await songService.songsList());
        if(user.id && addedSongs.length != 0){
            var result = addedSongs.data.filter((x)=>x.addedBy === user.id);
            for(var i = 0; i < levels.length; i++){
                if(result.length < levels[i]){
                    setLevelImg(i === 0? Bronze : i === 1? Silver : i === 2? Gold : Platinum);
                }
            }//settotalSongs((addedSongs.length * percentage)/maxVentilSongs);
        }
    })();

  }, []);
  return (
    <Stack direction="row" spacing={2}>
      {withBadge?
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <SmallAvatar alt={user.username? user.username : user} src={levelImg} />
          }
        >
          <Avatar alt={user.username? user.username : user} src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${user.username}`} />
        </Badge>
      :  <Avatar alt={user.username? user.username : user} src="/static/images/avatar/2.jpg" />}
    </Stack>
  );
}

export default AvatarLayout;

