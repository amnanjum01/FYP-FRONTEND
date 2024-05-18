import React from 'react'
import ProductDisplayTable from './ProductDisplayTable'
import SearchResultsTab from './SearchResultsTab'

export default function SearchResult() {
    const resultCategory = "Clothes"
  return (
    <div className='search-result-products'>
        <p className='fs-3'>{resultCategory}</p>
        <SearchResultsTab></SearchResultsTab>
      <ProductDisplayTable></ProductDisplayTable>
      </div>
  )
}
