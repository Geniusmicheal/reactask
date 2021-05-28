import {  useContext,useEffect, useState } from 'react';
import './Body.css';
import Card from './Card'
import { ServiceContext } from '../../Service';
import Spinner from '../Spinner';

function Body() {
    const cardContext_ = useContext(ServiceContext);
    const {loading, getAllTemplates,templates } = cardContext_;
    const [pageNum, setPageNum] = useState(0);
    useEffect(() => {
        if(!templates)getAllTemplates();
    }, []);


    
    if(!templates ||  loading) return <Spinner />
    const onPagination_ =e => {
         let current= pageNum;
         let next =parseInt(e.target.id);
        let last =templates.length%20 > 0 ? parseInt(templates.length/20)+1 : parseInt(templates.length/20);
        if((next ===-1 && current >0) || (next ===1 && current < last) ) setPageNum(parseInt(current)+parseInt(next));
    }
    return (
        <div>
            <p className="body-topic">
                <span>All Templates</span>
                <span>{templates.length} templates</span>
            </p>
            <div className="body-card">{
                Object.entries(templates.slice(parseInt(1*pageNum*20 ),20*parseInt(pageNum+1))).map((task, i ) =>
                    <Card key={task[0]} task_={task[1]} />
                )
            }</div>

            <p className="body-footer">
                <span onClick={onPagination_} id="-1">Previous</span>
                <span><span className="page">{pageNum+1}</span> of {templates.length%20 > 0 ? parseInt(templates.length/20)+1 : parseInt(templates.length/20)}</span>
                <span onClick={onPagination_}  id="1">Next > </span>
            </p>
        </div>
    )
}

export default Body
