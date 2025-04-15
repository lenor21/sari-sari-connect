const CartItem = () => {
  return (
    <div className='h-auto w-full cursor-pointer rounded-md overflow-hidden shadow-2xl relative group flex'>
      <div className='w-full h-40 overflow-hidden sm:h-52 sm:w-full'>
        <img
          className='h-full w-full object-cover group-hover:scale-125 transition-all duration-300'
          src='https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
        />
      </div>

      <div className='p-3 pl-5 w-full relative'>
        <h2 className='flex items-start gap-x-3 font-bold'>Test</h2>
        <p className='flex items-start gap-x-3'>$2</p>

        <div className='flex absolute bottom-4 left-[50%] translate-x-[-50%] gap-x-1'>
          <button className='px-2 border-2 border-[#333]'>-</button>
          <input
            className='bg-[#ddd] border-2 border-[#333] w-12 text-center'
            type='text'
            value=''
          />
          <button className='px-2 border-2 border-[#333]'>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
