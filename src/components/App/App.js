import { useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Application } from './App.styled';
import { Button } from '../Button/Button';

import { ErrorView } from 'components/ErrorView/ErrorView';
import { Loader } from 'components/Loader/Loader';
import picturesApi from '../../servises/pictures-api';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleFormSubmit = data => {
    if (searchValue !== data) {
      setSearchValue(data);
      setPage(1);
      setSearchData([]);
    }
  };
  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    setStatus('pending');
    picturesApi
      .fetchPictures(searchValue, page)
      .then(response => {
        if (response.data.total === 0) {
          return Promise.reject(
            new Error(
              `No results for search value ${searchValue}, please try another search value!`
            )
          );
        }
        const pageTotal = Math.ceil(response.data.total / 12);
        setPageTotal(pageTotal);
        const result = response.data.hits;

        setSearchData(prevSearchData => {
          return [...prevSearchData, ...result];
        });

        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [searchValue, page]);

  return (
    <Application>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'idle' && <p>Enter search value</p>}

      {status === 'rejected' && <ErrorView message={error.message} />}
      <ImageGallery searchData={searchData} />
      {status === 'pending' && <Loader />}

      {searchData.length > 0 && page !== pageTotal && (
        <Button loadMore={loadMore} buttonName="Load more" />
      )}
      <ToastContainer />
    </Application>
  );
};

// export class OldApp extends Component {
//   state = {
//     searchValue: '',
//     searchData: [],
//     page: 1,
//     pageTotal: 1,
//     error: null,
//     status: 'idle',
//   };

//   handleFormSubmit = searchValue => {
//     if (this.state.searchValue !== searchValue) {
//       this.setState({
//         searchValue,
//         page: 1,
//         searchData: [],
//       });
//     }
//   };

//   componentDidUpdate(_, prevState) {
//     if (
//       prevState.page !== this.state.page ||
//       prevState.searchValue !== this.state.searchValue
//     ) {
//       this.setState({ status: 'pending' });
//       const page = this.state.page;
//       const searchValue = this.state.searchValue;
//       picturesApi
//         .fetchPictures(searchValue, page)
//         .then(response => {
//           if (response.data.total === 0) {
//             return Promise.reject(
//               new Error(
//                 `No results for search value ${searchValue}, please try another search value!`
//               )
//             );
//           }
//           const result = response.data.hits;
//           const pageTotal = Math.ceil(response.data.total / 12);

//           this.setState(prevState => ({
//             status: 'resolved',
//             searchData: [...prevState.searchData, ...result],
//             pageTotal: pageTotal,
//           }));
//         })
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   }

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { searchData, error, status, page, pageTotal } = this.state;
//     return (
//       <Application>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {status === 'idle' && <p>Enter search value</p>}

//         {status === 'rejected' && <ErrorView message={error.message} />}
//         <ImageGallery searchData={searchData} />
//         {status === 'pending' && <Loader />}

//         {searchData.length > 0 && page !== pageTotal && (
//           <Button loadMore={this.loadMore} buttonName="Load more" />
//         )}
//         <ToastContainer />
//       </Application>
//     );
//   }
// }
