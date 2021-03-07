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
    //console.log(searchKey)

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