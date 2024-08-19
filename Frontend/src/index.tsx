import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'aos/dist/aos.css';
import { Provider } from 'react-redux';
import { appStore } from './Redux/Store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={appStore}>
            <Layout />
        </Provider>
    </BrowserRouter>
);

reportWebVitals();
