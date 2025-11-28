import { motion } from 'framer-motion'

const FloatingBackground = () => {
    const shapes = [
        { color: 'bg-purple-500', size: 'w-64 h-64', position: 'top-10 left-10', delay: 0 },
        { color: 'bg-blue-500', size: 'w-48 h-48', position: 'top-40 right-20', delay: 2 },
        { color: 'bg-indigo-500', size: 'w-32 h-32', position: 'bottom-20 left-20', delay: 4 },
        { color: 'bg-pink-500', size: 'w-40 h-40', position: 'bottom-40 right-40', delay: 6 },
    ]

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {shapes.map((shape, index) => (
                <motion.div
                    key={index}
                    className={`absolute rounded-full opacity-10 ${shape.color} ${shape.size} ${shape.position}`}
                    animate={{
                        y: [0, -100, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        delay: shape.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    )
}

export default FloatingBackground