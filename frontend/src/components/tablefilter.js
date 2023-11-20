import React, {forwardRef, useCallback, useImperativeHandle, useState, useEffect} from "react";

export default forwardRef((props, ref) => {
    
    const [filterState, setFilterState] = useState('off');
    useEffect(() => props.filterChangedCallback(), [filterState, props.searchTerm]);

    useImperativeHandle(ref, ()=>{
        return {
            myFilter() {
                console.log('yo')
            },
            isFilterActive() {
                return filterState!='off';
            },
            doesFilterPass(params) {
                const field = props.colDef.field
                return params.data[field] == filterState;
            },
            getModel() {
                if (filterState=='off') {
                    return undefined;
                }
                return {
                    state: filterState 
                }
            },
            setModel(model) {
                if (model==null) {
                    setFilterState('off');
                } else {
                    setFilterState(model.state);
                }
            }
        };
    })

    const onListener = useCallback(
        ()=> setFilterState('on'), []
    );
    const offListener = useCallback(
        ()=> setFilterState('off'), []
    );
    return (
        <>
        <div>{props.title}</div>
        <div>
            State = {filterState}
        </div>
        <div>
            <button
                onClick={()=>setFilterState('off')}>
                    Off
            </button>
        </div>
        { props.values.map( value => (
            <div>
                <button key={value}
                    onClick={()=>setFilterState(value)}>
                        {value}
                </button>
            </div>
        ))}
        </>
    )
});