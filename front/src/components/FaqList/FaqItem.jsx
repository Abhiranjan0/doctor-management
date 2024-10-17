import { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const FaqItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="p-5 rounded-lg border border-solid border-gray-300 mb-5 cursor-pointer hover:shadow-md">
            <div className="flex items-center justify-between">
                <h4 className="text-lg leading-7 text-gray-800">{item.question}</h4>
                <div
                    className={`w-8 h-8 border border-solid border-gray-700 rounded-full flex items-center justify-center ${
                        isOpen ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={toggleAccordion}
                >
                    {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </div>
            </div>
            {isOpen && <div className='mt-4'>
                <p className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>{item.content}</p>
                </div>}
        </div>
    )
}

export default FaqItem
