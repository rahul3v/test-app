const SearchData=({searchData,page,perPage})=>{

  return(
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
  )
}

export default SearchData;