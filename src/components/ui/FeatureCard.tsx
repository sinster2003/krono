import { ReactNode } from 'react'

const FeatureCard = ({ icon, title, desc }: { icon: ReactNode, title: string, desc: string }) => {
    return (
        <>
            <div className="bg-primary/10 p-10 pb-12 rounded-lg shadow-lg hover:-translate-y-3 transition-all duration-300 ease-in-out cursor-pointer">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                    {icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
            </div>
        </>
    )
}

export default FeatureCard