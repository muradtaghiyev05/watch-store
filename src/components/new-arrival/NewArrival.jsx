import NewImage from '../../assets/other-images/tagheuer.png'
import { Link } from "react-router-dom";

const NewArrival = () => {
  return (
    <div className="new-arrival-card">
        <div className="image-part">
            <div className="square">
                <div className="circle">
                </div>
            </div>
            <img src={NewImage} alt='new-arrival' className="new-arrival-img" />
        </div>
        <div className="info-part">
            <span className='red-span'>Ən Çox Satılan</span>
            <span className='new-arrival-title'>Tag Heuer Formula 1</span>
            <p className='new-arrival-desc'>
                Öz möhtəşəm görünüşü və keyfiyyəti ilə saat sevərlərin vazgeçilməz seçiminə çevrilən bir brend.
                Əgər siz də sınamaq istəyirsinizsə tərəddüd belə etməyin.
            </p>
            <Link to='/product/10' className='Link'><button className='learn-more'>Ətraflı Məlumat</button></Link>
        </div>
    </div>
  )
}

export default NewArrival