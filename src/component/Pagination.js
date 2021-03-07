const Pagination=({setPage,page,totalPage})=>{

  return(
    <div className="page flex-box">{
      totalPage>1 && 
      Array(totalPage).fill(null).map((d,i)=>{
        return (
          <div className="pNumber" key={i} style={{color:page===i+1?'red':''}} onClick={(e)=>{setPage(i+1)}}>{i+1}</div>
        )
      })
    }</div>
  )
}

export default Pagination;