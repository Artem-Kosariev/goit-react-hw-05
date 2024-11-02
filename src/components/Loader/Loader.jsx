import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
	return (
		<div className={css.loader}>
			<ThreeCircles
             visible={true}
              height="100"
              width="100"
              color="blue"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />

		</div>
	);
};

export default Loader;