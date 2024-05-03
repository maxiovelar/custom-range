import { InDevelopment } from '@/_common/components/svg/in-development/InDevelopment';
import { pageTitles } from '@/_common/constants/constants';

const PageExercise2 = () => {
    return (
        <>
            <h1 className="title">{pageTitles.exercise2}</h1>
            <InDevelopment />
            <section className="text-container">
                <h2>COMING SOON...</h2>
                <p>This feature is in development yet, stay tuned!</p>
            </section>
        </>
    );
};

export default PageExercise2;
