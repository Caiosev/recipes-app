import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

export function Provider({ children }) {
  const [content, setContent] = useState({});
  const [categories, setCategories] = useState({});

  return (
    <Context.Provider
      value={ {
        content,
        setContent,
        categories,
        setCategories,
      } }
    >
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
