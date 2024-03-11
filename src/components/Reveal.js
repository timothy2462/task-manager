import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect } from "react"
import { useRef } from "react"

const Reveal = (props) => {

    const ref = useRef(null)

    const isInView = useInView(ref, { once: false })

    const mainControl = useAnimation()

    useEffect(() => {
        isInView && mainControl.start("visible")
    }, [isInView, mainControl])

    return (
        <div ref={ref}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 13 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControl}
                transition={{
                    duration: props.duration ? props.duration : 0.5,
                    delay: props.delay
                }}
            >
                {props.children}
            </motion.div>
        </div>
    )
}

const SlideLeft = (props) => {

    const ref = useRef(null)

    const isInView = useInView(ref, { once: false })

    const mainControl = useAnimation()

    useEffect(() => {
        isInView && mainControl.start("visible")
    }, [isInView, mainControl])

    return (
        <div ref={ref}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, x: -13 },
                    visible: { opacity: 1, x: 0 },
                }}
                initial="hidden"
                animate={mainControl}
                transition={{ duration: 0.5, delay: props.delay }}
            >
                {props.children}
            </motion.div>
        </div>
    )
}

export { Reveal, SlideLeft }