import { FiAlertTriangle } from 'react-icons/fi';

interface NoResultProps {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
}

const NoResult = ({ message = 'No result found', icon = <FiAlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />, className = '' }: NoResultProps) => {
  return (
    <div className={`flex items-center gap-3 justify-center h-full w-full text-neutral-500 ${className}`}>
      {icon}
      {message}
    </div>
  )
}

export default NoResult