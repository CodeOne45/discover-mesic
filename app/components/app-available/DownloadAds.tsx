
import appStore from '../../asset/App-Store.png';
import googlePlay from '../../asset/Google-Play.png';

const DownloadAds: React.FC = () => {
    const downloadImgStyle = 'border-[2px] border-[#232A4E] rounded-[13px] h-[3rem] w-[10rem]'
    return (
        <div className="download">
            <div className="download_images flex">
            <img
            src={appStore.src}
            alt=""
            className={downloadImgStyle + ` mr-[2rem]`}
            />
            <img
            src={googlePlay.src}
            alt=""
            className={downloadImgStyle}
            /> 
            </div>
        </div>
        )
};

export default DownloadAds;