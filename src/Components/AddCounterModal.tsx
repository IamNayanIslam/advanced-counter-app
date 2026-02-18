interface IProps {
    setAddCounterModal: (value: boolean)=> void;
}

const AddCounterModal = ({setAddCounterModal}: IProps) => {

    const closeAddCounterModal = ()=>{
        
        setAddCounterModal(false);
    }

    const handlePropogation = (e: React.MouseEvent<HTMLDivElement>) =>{
        e.stopPropagation();
    }
  return (
    <div onClick={closeAddCounterModal} className='fixed inset-0 z-50 w-full min-h-screen bg-black/10 backdrop-blur-[1px] flex justify-center items-center'>
        <div onClick={handlePropogation} className='w-[300px] bg-white rounded-xl p-4'>
            <h2 className="text-xl text-center mb-4">Add New Counter</h2>
            <form className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <label htmlFor="counterName">Counter name</label> 
                    <input type="text" placeholder="your counter name here" value={""}/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="counterName">Target</label> 
                    <input type="text" value={99}/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="counterName">Lap</label> 
                    <input type="text" value={33}/>
                </div>
                <button>Save</button>
            </form>
        </div>
    </div>
  )
}

export default AddCounterModal