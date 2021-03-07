import React, {useEffect,useState} from 'react';
import './App.css';
import Table from './component/Table';
import SearchData from './component/SearchData';
import Pagination from './component/Pagination';
import SearchBar from './component/SearchBar';
import data from './data/mock_data.json';
import {sortFun,pageFun,searchFun,urlState} from './lib/scripts';

function App() {
  let q,p,s;
  try{
    let urlQ=window.location.search.match(/query=(.*?)($|&)/),
        urlP=window.location.search.match(/page=(.*?)($|&)/),
        urlS=window.location.search.match(/sort=(.*?)($|&)/);
    p= urlP && parseInt(decodeURI(urlP[1]));
    q= urlQ && decodeURI(urlQ[1]);
    s= urlS && decodeURI(urlS[1]);
  }catch(e){
    q=" "
    s="--"
  }
  p=Math.abs(p)||1;

  const [query,setQuery]=useState(q||localStorage.getItem("query"));
  const [sortedType, setSortedType]=useState(s||localStorage.getItem("sortedType") ||'');
  const [page,setPage]=useState(p||localStorage.getItem("page")||1);
  
  console.log("outer"+data.length);
  let perPage=9;
  let sortList=['--','title-ASC','title-DES','dateLastEdited'];
  let searchData=searchFun([...data],query);
      searchData=sortFun(searchData,sortedType);
  const totalPage=pageFun(searchData.length,perPage)

  useEffect(() => {
    localStorage.setItem("query", query);
    if((query && page>totalPage) || page>totalPage){setPage(1);}
    urlState(query,page,sortedType)
  },[query])

  useEffect(() => {
    localStorage.setItem("page", page);
    localStorage.setItem("sortedType", sortedType);
    urlState(query,page,sortedType)
    window.scrollTo(0,0);
  },[page,sortedType])

  return (
    <div className="container">
      <h1>Feed</h1>{
      //{totalPage} + {data.length} + {searchData.length} + {page} + {sortedType}
      }
      <SearchBar query={query} setQuery={setQuery} sortList={sortList} sortedType={sortedType} setSortedType={setSortedType}/>
      {
      //{(page-1)*perPage} ||  {(page*perPage)<searchData.length?(page*perPage)-1:undefined} || {searchData.length}
      }
      <SearchData searchData={searchData} page={page} perPage={perPage}/>
      <Pagination page={page} totalPage={totalPage} setPage={setPage}/>      
      {searchData && searchData.length? <Table searchData={searchData}/>:''}
    </div>
  );
}
export default App;