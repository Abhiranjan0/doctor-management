const Contact = () => {
  return (
    <section>
      <div className='px-4  mx-auto max-w-screen-md'>
        <h2 className="heading text-center">Contact us</h2>
        <p className="mb-8 font-light text-center text__para lg:mb-16">
          Got a Technical issue? want to send feedback about a beta feature?
          let us know.
        </p>
        <form action='#' className='space y-8'>
          <div>
            <label htmlFor='email' className='form__label'>
              Email : </label>
              <input type='email' id='email' placeholder="example.@gmail.com" className='form__input mt-1' />
          </div>
          <div>
            <label htmlFor='subject' className='form__label'>
              Subject : </label>
              <input type='text' id='subject' 
              placeholder="let us know how we can help you"
               className='form__input mt-1' />
          </div>

          <div className='sm:col-span-2'>
            <label htmlFor='message' className='form__label'>
              Your message : </label>
              <textarea type='text' id='message' rows='6'
              placeholder="leave a comment ..."
               className='form__input mt-1' />
          </div>
          
            <button className='btn rounded sm:w-fit' type='submit'>Submit</button>
          
        </form>
      </div>
      
    </section>
  )
}

export default Contact