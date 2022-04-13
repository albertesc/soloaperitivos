export default function Duratioin ({ duration }) {
  return (
    <div className='flex items-center'>
      <svg className='w-4 h-4 text-gray-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
      <span className='text-xs'>{duration} de preparación</span>
    </div>
  )
}
