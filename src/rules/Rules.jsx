import Header from '../Header';
import { useParams } from 'react-router-dom';

function Rules() {
    let { league } = useParams();
    return (
        <>
        <Header
            page="rules"
            league={league}
        ></Header>
        <div className="calendar-cards-container">
        <h1>REGLAMENTO</h1>
        <iframe src="F1_SerieMunon_LibroDeReglas_v0.8.pdf" width="100%" height="800px">
    </iframe>
        </div>
        </>
    )
}

export default Rules;