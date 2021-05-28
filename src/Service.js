import { createContext,useState } from "react";
export const ServiceContext = createContext();

const ServiceContextState_ = (props) => {
    const [templates, setTemplates] = useState(null);
    const [_templates, _setTemplates] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ alert , setAlert] = useState(null);
    const [ category , setCategory] = useState(['Loading....']);
    const [text, setText] = useState('');
    const [sort_, setSort] = useState({category:"All",order:"Default",date:"Default"});

    const taskTemplatesApiRecord = async () =>{
        const targetUrl = 'https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates';
        await fetch(targetUrl).then(response => response.json()).then(data => {
            setTemplates(data);
            _setTemplates(data);
            var _category= ["All"];
            let x;
            for (x in data) {
                _category = [...new Set([..._category ,...data[x].category])]
            }
            setCategory(_category);
        })
    }

    const getAllTemplates =  async () => {
        setLoading(true);
        await taskTemplatesApiRecord();
        setLoading(false);
    }

    const showAlert = (msg, type) => { 
        setAlert({msg,type});
        setTimeout(() => setAlert(null), 5000);
    }

    const sortSearch = async (id) => { 
        setLoading(true);
        var _task= [];
        let search= id.split("?~`");

        for (let x in _templates) {
            if(sort_.category!== 'All' && ((_templates[x].category).indexOf(sort_.category) < 0)) continue;
            if(
                ((search[0]==='search' && search[1] !== '') && (_templates[x].name).toUpperCase().indexOf(search[1].toUpperCase()) > -1 ) || 
                ((search[0]!=='search' && text!== '') && (_templates[x].name).toUpperCase().indexOf(text.toUpperCase()) > -1)
                || ((search[0]==='search' && search[1] === '') || (search[0]!=='search' && text=== ''))
            )_task.push(_templates[x]);
            continue;
        }

        if(id=='date'){
            if(sort_.date !='Default'){
                _task.sort((a, b) => a.time !== b.time ? a.time < b.time ? -1 : 1 : 0);
                if(sort_.date =='Descending') _task.reverse();
            }
        }else{
            if(sort_.order !='Default'){
                _task.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);
                if(sort_.order =='Descending') _task.reverse();
            }
        }
        if(_task.length<1)showAlert(' Tada! Get started with a free template. Can’t find what you are looking for? Search from the 1000+ available templates','warning');
        else setAlert(null);
        setTemplates(_task);
        setLoading(false);
        
    }


    return (<ServiceContext.Provider value={{ sort_,templates, loading, alert, setAlert,category, getAllTemplates, setSort, sortSearch,setText }}> {props.children}</ServiceContext.Provider>);

}
export default ServiceContextState_;