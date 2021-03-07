const SearchBar=({query,setQuery,sortList,sortedType,setSortedType})=>{

  return(
    <div className="flex-box">
      <div className="searchBar">
        <input type="text" placeholder="Search..." value={query && query.replace(/(\ ){2,}/g,'$1')} onInput={(e)=>{setQuery(e.target.value)}} />
        <svg className="icon" width="24" height="24" fill="none"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
      </div>
      <div className="sort-box">
        Sort by
        <select onChange={(e)=>setSortedType(e.target.value)} value={sortedType}>
          {sortList.map((d,i)=>{
            return <option key={i}>{d}</option>
          })}
        </select>
      </div>
    </div>
  )
}

export default SearchBar;