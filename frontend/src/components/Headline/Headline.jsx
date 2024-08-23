import './style.css'

function Headline({ headlineText, link, img }) {
    return (
        <div className="card">
            {img && <img src={img} className="card-image"/>}
            <a href={link} target="_blank" className="card-text">
                <h2>{headlineText}</h2>
            </a>
        </div>
    );
};
  
export default Headline;
