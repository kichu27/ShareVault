import React from 'react'
import sty from "@/app/styles/Hero2.module.css"

const Hero2 = () => {
    return (
        <div className={sty.maincont}>
        <div className={sty.subdiv1}>
            <h1> ShareVault </h1>
            <p>Store and manage your important documents securely with ShareVault.</p>
        </div>
        <div className={sty.subdiv2}>
            <div className={sty.subdiv20}>
                <h4>Upload Documents</h4>
                <p>Effortlessly upload your important files and access them anytime, anywhere.</p>
            </div>
            <div className={sty.subdiv20}>
                <h4>Secure Storage</h4>
                <p>Keep your documents safe with our state-of-the-art encryption and security protocols.</p>
            </div>
            <div className={sty.subdiv20}>
                <h4>Easy Sharing</h4>
                <p>Share your documents with trusted individuals securely and conveniently.</p>
            </div>
        </div>
    </div>
    
    )
}

export default Hero2