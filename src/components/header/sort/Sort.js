import {  useContext } from 'react';
import { ServiceContext } from '../../../Service';


function Sort() {
    const cardContext_ = useContext(ServiceContext);
    const { templates,category, setSort,sortSearch,sort_ } = cardContext_;


    const onSelect_ = async e => {
       let _sort = sort_;
       _sort[(e.target.id).trim()] = (e.target.value).trim();
       setSort(_sort);
       if(templates) await sortSearch(e.target.id);
    }

    return (
        <div className="form-group form-inline" >
            <label>Sort By:</label>
            <span>
                <label> Category </label>
                <select className="form-control" id="category" onChange={onSelect_}>
                    {
                        category.map((category_,i) => (
                            <option keys={i+'jjj'} value={category_}>{category_}</option>
                        ))
                    }
                </select>
            </span>

            <span>
                <label> Order </label>
                <select className="form-control" id="order" onChange={onSelect_}>
                    <option>Default</option>
                    <option>Ascending</option>
                    <option>Descending</option>
                </select>
            </span>
            <span>
                <label> Date </label>
                <select className="form-control" id="date" onChange={onSelect_}>
                    <option>Default</option>
                    <option>Ascending</option>
                    <option>Descending</option>
                </select>
            </span>

        </div>
    )

    
}

export default Sort;

