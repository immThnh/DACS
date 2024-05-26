import React from 'react';
import styles from './searchAdminComponent.module.scss';
import icon from '../../assets/images/search.png'
const SearchComponent = ({ handleSearchInputChange }) => {
    return (
        <div id="seachWrap" className={styles.search}>
            <img
            src={icon}
            className='w-6 h-6 mr-3'
            />
            <input
                onChange={handleSearchInputChange}
                id="searchInput"
                type="search"
                placeholder="Search.."
                
            />
        </div>
    );
};

export default SearchComponent;
