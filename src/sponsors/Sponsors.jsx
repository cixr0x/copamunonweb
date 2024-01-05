import Header from '../Header';
import { useParams } from 'react-router-dom';

function Sponsors() {
    let { league } = useParams();
    return (
        <>
            <Header
                page="sponsors"
                league={league}
            ></Header>
            <div className="calendar-cards-container">
                <h1>PATROCINIOS</h1>
                <iframe src="patrocinios_v1.pdf" width="100%" height="800px">
                </iframe>
            </div>
        </>
    )
}

export default Sponsors;