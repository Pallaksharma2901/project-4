import { useRef, useState } from 'react';
// import Table from './Table';

const Form = () => {
    const initialData = {
        comment: '',
        email: '',
        name: '',
        ratings: '', 
        date: '',
        time: ''
    };
    const [formData, setFormData] = useState(initialData);
    const [formErrors, setFormErrors] = useState({});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [data, setData] = useState([])
    const formRef = useRef();

    const Stars = ({rating})=>{
        const fill = Array.from({length: rating});
        const filledStars = fill.map((star,idx) => <i key={idx} class="ri-star-fill text-yellow-300"></i>);
        const unfill = Array.from({length: 5 - rating});
        const unFilledStars = unfill.map((star,idx) => <i key={idx} class="ri-star-fill text-gray-300"></i>);
        console.log(filledStars, unFilledStars);
        return (
            <p className="flex">
                {filledStars}
                {unFilledStars}
            </p>
        );
        
    }

    const handleInputChange = (e) => {
        setFormErrors({})
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const formattedTime = currentDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
        });

        const updatedFormData = {
            ...formData,
            date: formattedDate,
            time: formattedTime
        };

        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        }
        if (!formData.comment.trim()) {
            errors.comment = "Please write your comment";
        }
        
        setFormErrors(errors);
        setIsFormSubmitted(true);
        
        if (Object.keys(errors).length === 0) {
            setData([...data, updatedFormData])
            formRef.current.reset();
        }
    }
    
    console.log(formData)
    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl text-sky-700 font-semibold my-5'>Comment & Review</h1>
            <form ref={formRef} className="bg-gray-50 w-4/12 mx-auto mb-6 p-5 rounded shadow-lg border border-sky-600" onSubmit={handleFormSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900">Your name</label>
                    <input
                        type="text" id="name"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 ${formErrors.name ? 'border-red-500' : ''}`}
                        placeholder="John smith" required
                        onChange={handleInputChange}
                    />
                    {isFormSubmitted && formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900">Your email</label>
                    <input type="email" id="email" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 ${formErrors.email ? 'border-red-500' : ''}`} placeholder="name@flowbite.com" required
                        onChange={handleInputChange}
                    />
                    {isFormSubmitted && formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
                <div className="mb-5">
                    <div>
                        <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900"> Comment</label>
                        <textarea id="comment" rows={4} className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${formErrors.comment ? 'border-red-500' : ''}`} defaultValue={""} onChange={handleInputChange} required />
                        {isFormSubmitted && formErrors.comment && <p className="text-red-500 text-sm mt-1">{formErrors.comment}</p>}
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="ratings" className='block mb-2 text-sm font-medium text-gray-900'>Ratings</label>
                    <select id="ratings" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={formData.ratings} onChange={handleInputChange}>
                        <option selected value="">Choose Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button type="submit" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
            <h4 className='text-3xl mb-5'>Comment List</h4>
            <div className='w-6/12'>
                {
                    data.length > 0 ? data.map((comment, idx) => {
                        // return <article className="p-4 text-base bg-white rounded-lg border shadow-md shadow-sky-100 border-sky-500">
                        //     <footer className="flex justify-between items-center mb-2">
                        //         <div className="flex items-center">
                        //             <p className="inline-flex items-center mr-3 text-md text-gray-900 font-bold"><img className="mr-2 w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough" /> {comment.name}</p>
                        //             <p className="text-sm text-gray-600"><time>{comment.date}</time></p>
                        //         </div>
                        //         <div>
                        //             <p className="text-sm text-black"><time>{comment.time}</time></p>
                        //         </div>
                        //     </footer>
                        //     <h6>Email : <span className="text-gray-500">{comment.email}</span></h6>
                        //     <h6>Comment : <span className="text-gray-500">{comment.comment}</span></h6>
                        // </article>
                        return <div className="bg-gray-50 p-4 flex items-center justify-center" key={idx}>
                            <div className="bg-white border-gray-200 p-4 rounded-xl border w-full">
                                <div className="flex justify-between mb-5">
                                    <div className="flex items-center">
                                        <img className="h-11 w-11 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" />
                                        <div className="ml-1.5 text-sm leading-tight">
                                            <span className="text-black font-bold block">{comment.name}</span>
                                            <span className="text-gray-500 font-normal block">{comment.email}</span>
                                        </div>
                                    </div>
                                    <svg className="text-blue-400 h-6 w-auto inline-block fill-current" viewBox="0 0 24 24"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" /></g></svg>
                                </div>
                                <p className="text-black block text-lg leading-snug my-1">“{comment.comment}”  —  <b>{comment.name}</b></p>
                                <div className='text-black text-lg leading-snug flex gap-2 my-1'>
                                    <p className='font-semibold'>Ratings : </p> <Stars rating={comment.ratings} />
                                </div>
                                <p className="text-gray-500 text-sm py-1 my-0.5">{comment.time} · {comment.date}</p>
                                <div className="border-gray-200 border border-b-0 my-3" />
                                <div className="text-gray-500 flex mt-3">
                                    <div className="flex items-center mr-6">
                                        <svg className="fill-current h-5 w-auto" viewBox="0 0 24 24" style={{}}><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" /></g></svg>
                                        <span className="ml-3">615</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }) : ''
                }
            </div>
        </div>
    )

}

export default Form;