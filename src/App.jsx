import { useState } from "react";

export default function App({POKEMONS, COLOR}){
  const[searchText, setSearchText]=useState("");
  const[bstNum, setBSTNum]=useState("");
  const[type1, setType1]=useState("Type");
  const[type2, setType2]=useState("Type");
  const[compare, setCompare]=useState("Less Than");
  const[filterName, setFilterName]=useState('-')
  const[filterBST, setFilterBST]=useState('-')

  let res=getResults(POKEMONS,searchText,bstNum,[type1,type2],compare,[filterName,filterBST]);


  return(
    <>
      <div id="app"> 
        <Search setSearchText={setSearchText} type1={type1} type2={type2} setType1={setType1} setType2={setType2} compare={compare} setCompare={setCompare} setBSTNum={setBSTNum} COLOR={COLOR}/>
        <Results res={res} color={COLOR} filterName={filterName} filterBST={filterBST} setFilterName={setFilterName} setFilterBST={setFilterBST}/>
      </div>
    </>
  );
}

function Search({setSearchText, type1, type2, setType1, setType2, compare, setCompare, setBSTNum, COLOR}){
  function handleChange(e){
    let t = e.target.value;
    setSearchText(t);
  }
  return(
    <>
      <div id="search">
        <input type="text" placeholder="Search your pokemon..." onChange={handleChange}/>
        <TypeSelector type1={type1} type2={type2} setType1={setType1} setType2={setType2} COLOR={COLOR}/>
        <BSTSelector compare={compare} setCompare={setCompare} setBSTNum={setBSTNum}/>
      </div>
    </>
  )
}
function TypeSelector({type1, type2, setType1, setType2, COLOR}){
  return(
    <>
      <div id="typeSelector">
        <Type type={type1} setType={setType1} COLOR={COLOR}/>
        <Type type={type2} setType={setType2} COLOR={COLOR}/>
      </div>
    </>
  );
}
function Type({type,setType, COLOR}){
  function handleClick(e){
    let t = e.target.innerText;
    let types = Object.keys(COLOR);
    types.unshift("Type");
    // console.log(types)
    switch(t){
      case "Type":
        setType("Grass");
        break;
      default:
        for(let i=0;i<types.length;i++){
          if(types[i]==t){
            setType(types[(i+1)%types.length])
          }
        }
   }
  }
  return(
    <>
      <span className="type" onClick={handleClick} style={{"--c":COLOR[type], "color":(type=="Type"?"black":"white"), "textShadow":(type=="Type"?"none":"2px 1px black"), "userSelect":"none"}}>{type}</span>
    </>
  );
}
function BSTSelector({compare, setCompare, setBSTNum}){
  function handleChange(e){
    let b=Number(e.target.value);
    setBSTNum(b);
  }
  return(
    <>
      <div id="bstSelector">
        <span>BST</span>
        <BSTCompare compare={compare} setCompare={setCompare}/>
        <input type="Number" placeholder="" onChange={handleChange}/>
      </div>
    </>
  );
}
function BSTCompare({compare, setCompare}){
  function handleClick(e){
    let t = e.target.innerText;
   switch(t){
    case "Less Than":
      setCompare('Greater Than');
      break;
    case "Greater Than":
      setCompare('Greater Than Equal To');
      break;
    case "Greater Than Equal To":
      setCompare('Less Than Equal To');
      break;
    case "Less Than Equal To":
      setCompare('Equal To');
      break;
    case "Equal To":
      setCompare('Less Than');
      break;
   }
  }
  return(
    <>
      <div className="bstCompare" onClick={handleClick} style={{userSelect: "none"}}>{compare}</div>
    </>
  );
}


function Results({res,color,filterName,filterBST,setFilterName,setFilterBST}){

  return(
    <>
      <div id="results">
        <HeaderRow filterName={filterName} filterBST={filterBST} setFilterName={setFilterName} setFilterBST={setFilterBST}/>
        {
          res.map((r,i)=>{
            return<PokemonDataRow key={i} name={r.name} type={r.type} bst={r.bst} color={color}/>
          })
        }
      </div>
    </>
  );
}
function HeaderRow({filterName,filterBST,setFilterName,setFilterBST}){
  return(
    <>
      <div id="headerRow">  
        <Filter heading="Name" filter={filterName} setFilter={setFilterName}/>
        <Filter heading="Type"/>
        <Filter heading="BST"  filter={filterBST} setFilter={setFilterBST}/>
      </div>
    </>
  );
}
function Filter({heading, filter, setFilter}){
  function handleClick(e){
    let orders=['-','A','D']
    for(let i=0;i<orders.length;i++){
      if(filter==orders[i]){
        setFilter(orders[(i+1)%orders.length]);
        break;
      }
    }
  }
  return(
    <>
      <div className="filter"><span>{heading}</span><div onClick={handleClick} style={{"userSelect":"none"}}>{filter}</div></div>
    </>
  );
}
function PokemonDataRow({name,type,bst,color}){
  return(
    <>
      <div className="pokemonDataRow">
        <span>{name}</span>
        <div>
          <div style={{"--color":color[type[0]]}}>{type[0]}</div>
          {type.length==2?<div style={{"--color":color[type[1]]}}>{type[1]}</div>:""}
        </div>
        
        <span>{bst}</span>
      </div>
    </>
  );
}

function getResults(mons,searchText,bstNum,type,compare,filter){
  let results = mons
  if(searchText!==""){
    let searchTexttLower=(searchText).toLowerCase();
    results=mons
    .filter((e)=>{return(startsWith((e.name).toLowerCase(),searchTexttLower))})
  }
  if(bstNum!==""){
    switch(compare){
      case "Less Than":
        results=results.filter((m)=>{
          return(m.bst<bstNum)
        })
        break;
      case "Greater Than":
        results=results.filter((m)=>{
          return(m.bst>bstNum)
        })
        break;
      case "Greater Than Equal To":
        results=results.filter((m)=>{
          return(m.bst>=bstNum)
        })
        break;
      case "Less Than Equal To":
        results=results.filter((m)=>{
          return(m.bst<=bstNum)
        })
        break;
      case "Equal To":
        results=results.filter((m)=>{
          return(m.bst===bstNum)
        })
        break;
    }
  }
  if(type[0]!="Type"){
    results=results.filter((e)=>{
      return(e.type[0]===type[0])
    })
  }
  if(type[1]!="Type"){
    results=results.filter((e)=>{
      return(e.type.length!==2?false:e.type[1]==type[1])
    })
  }
  switch(filter[0]){
    case 'A':
      results.sort((a,b)=>{
        return a.name>=b.name?1:-1;
      });
      break;
    case 'D':
      results.sort((a,b)=>{
        return a.name>=b.name?1:-1;
      });
      results.reverse();
      break;
    default:
      break;
  }
  switch(filter[1]){
    case 'A':
      results.sort((a,b)=>{
        return a.bst>=b.bst?1:-1;
      });
      break;
    case 'D':
      results.sort((a,b)=>{
        return a.bst>=b.bst?1:-1;
      });
      results.reverse();
      break;
    default:
      break;
  }

  // console.log(results)
  return results;
}

function startsWith(s,p){
  let temp=s.slice(0,p.length);
  if(temp==p){
    return true;
  }
  return false
}