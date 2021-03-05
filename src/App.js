import React, {useEffect,useState} from 'react';
import './App.css';
import data from './data/mock_data.json'

//sort logic
export const sortFun=(data,sortType)=>{
  let sortedData=data;
  //console.log("Callin sort"+data.length +"::"+sortType)
  switch (sortType){
    case 'title-ASC':
      sortedData=data.sort((a,b)=>a.name>b.name?1:-1)
      break;
    case 'title-DES':
      sortedData=data.sort((a,b)=>a.name>b.name?-1:1)
      break;
    case 'dateLastEdited':
      sortedData= data.sort((a,b)=>{
        return new Date(b.dateLastEdited) - new Date(a.dateLastEdited); 
      })
      break;
  }
  return sortedData;
}

 //search logic
 export const searchFun=(data,query)=>{
  let sData=data;
  if(!query)return sData;
  query=query.toLowerCase().trim();
  let searchKey=query;
  searchKey=query.match(/"(.*)"/);
  //searchKey=query.replace(/^['"](.*)["']$/,'$1');
  //console.log(searchKey)
  if(!searchKey){
    searchKey=query.split(" ");
    console.log(searchKey)

    sData = data.filter((d,i)=>{
      return searchKey.some(key =>{
        return (d.name.toLowerCase().indexOf(key) > -1 || d.description.toLowerCase().indexOf(key) > -1)
      })
    })
  }else{
    searchKey=query.replace(/"(.*)"/,'$1');
    sData = data.filter((d,i)=>{
      return (d.name.toLowerCase().indexOf(searchKey) > -1 || d.description.toLowerCase().indexOf(searchKey) > -1)
    })
  }
  return sData;
}

// total pageCount
export const pageFun=(dataLength,onePageLength)=>{
  onePageLength=onePageLength||9;
  return (Math.floor(dataLength/onePageLength) + (+Boolean(dataLength%onePageLength)))
}

// urlState logic
export const urlState=(query,page,sortedType)=>{
  const url = new URL(window.location);
  query?url.searchParams.set('query', query): url.searchParams.delete('query')
  page?url.searchParams.set('page', page): url.searchParams.delete('page')
  !(sortedType && sortedType==='--')?url.searchParams.set('sort', sortedType):url.searchParams.delete('sort')
  window.history.pushState({}, '', url);
}

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
      <div className="flex-box">
      <div className="searchBar">
        <input type="text" placeholder="Search..." value={query && query.replace(/(\ ){2,}/g,'$1')} onInput={(e)=>{setQuery(e.target.value)}} />
        <svg className="icon" width="24" height="24" fill="none"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
      </div>
        <div className="sort-box">
          Sort by
          <select onChange={(e)=>setSortedType(e.target.value)} value={sortedType}>
            {['--','title-ASC','title-DES','dateLastEdited'].map((d,i)=>{
              return <option key={i}>{d}</option>
            })}
        </select>
        </div>
      </div>
      {
      //{(page-1)*perPage} ||  {(page*perPage)<searchData.length?(page*perPage)-1:undefined} || {searchData.length}
      }

      <div className="search-data">
        {searchData && searchData.length?searchData.slice((page-1)*perPage,(page*perPage)<searchData.length?(page*perPage):undefined).map((d,i)=>{
          return (
            <div className="card" key={i} data-key={i}>
              <div className="img-box">
                <img src={'/logo192.png'||d.image} alt="data-img"/>
              </div>
              <div className="card-data">
                <h2>{d.name}</h2>
                <p><b>Updated : </b><span className="time">{`${new Date(d.dateLastEdited).toLocaleString()}`}</span></p>
                <p><b>Description : </b>{d.description}</p>
              </div>
            </div>
          )
        }):
        (
          <div className="notFound">No data found....</div>
        )
      }
      </div>

      <div className="page flex-box">{
        totalPage>1 && 
        Array(totalPage).fill(null).map((d,i)=>{
          return (
            <div className="pNumber" key={i} style={{color:page===i+1?'red':''}} onClick={(e)=>{setPage(i+1)}}>{i+1}</div>
          )
        })
      }</div>

      <div className="table-box">
        {searchData && searchData.length>0 && searchData.map((d,i)=>{
          return (
            <div className="trow" key={i}>
              <div className="img-box">
                <img src="/logo192.png" alt={d.image}/>
              </div>
              <div className="tdata">
                <h5>{d.name}</h5>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  );
}
export default App;