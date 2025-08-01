import React from "react";
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";



function CodeBlocks ({position,heading,subheadind,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor}){
    return(
        <div className={`flex ${position} my-20 justify-between gap-10`}>
            
                <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
                    {heading}
                    <div className="text-richblack-300 font-bold"> 
                        {subheadind}
                    </div>
                    <div className="flex flex-row gap-4">
                        <CTAButton action={ctabtn1.action} linkto={ctabtn1.linkto}>
                            <div className="flex gap-2 items-center">
                                {ctabtn1.btntext}
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                        <CTAButton action={ctabtn2.action} linkto={ctabtn2.linkto}>
                                {ctabtn2.btntext}
                        </CTAButton>
                    </div>
                </div>

                <div className="h-fit flex flex-row text-[15px] w-[100%] lg:w-[500px] rounded-lg bg-gradient-to-r from-[#0f172a]/50 via-[#1e293b]/50 to-[#0f172a]/50">
                    <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">   
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                        <p>12</p>
                        <p>13</p>
                    </div>
                    <div className={`flex flex-col w-[90%] gap-2 font-bold font-mono ${codeColor} pr-2`}>
                        <TypeAnimation
                            sequence={[codeblock,1000,""]}
                            repeat={Infinity}   
                            cursor={true}
                            style={
                                {
                                    whiteSpace:"pre-line",
                                    display :"block"
                                }
                            }
                            omitDeletionAnimation={true}
                        />
                    </div>
                </div>
        </div>
    )
}
export default CodeBlocks
