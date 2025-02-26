import { motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

const NoResult = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center h-full w-full text-neutral-500"
    >
      <FiAlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
      No result found
    </motion.div>
  )
}

export default NoResult