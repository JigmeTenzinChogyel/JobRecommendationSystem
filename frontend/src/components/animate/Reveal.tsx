import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
    children: JSX.Element;
    width?: "fit-content" | "100%";
    from?: "x" | "y";
    hiddenValue?: number
    visibleValue?: number
}

export const Reveal = ({ children, width = "fit-content", from = "y", hiddenValue = 75, visibleValue = 0 }: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    return (
        <motion.div
            ref={ref}
            style={{ position: "relative", width, overflow: "hidden" }}
            variants={{
                hidden: { opacity: 0, [from === "y" ? "y" : "x"]: hiddenValue },
                visible: { opacity: 1, [from === "y" ? "y" : "x"]: visibleValue },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.25 }}
        >
            {children}
        </motion.div>
    );
};