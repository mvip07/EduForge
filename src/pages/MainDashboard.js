function MainDashboard() {
    return (
        <div className="bg-blue-100 w-full h-screen">
            <div>
                <h1 className="text-[50px] p-10">SuperAdmin Dashboard</h1>
                <div className="flex">
                    <div className="w-[250px] h-[150px] bg-white border rounded-xl mx-10">
                        <div>
                            <p className="p-5">Total Active Clints</p>
                            <b className="text-[30px] p-5">1,204</b>
                        </div>
                    </div>
                    <div className="w-[250px] h-[150px] bg-white border rounded-xl mx-10">
                        <div>
                            <p className="p-5">Total Active Clints</p>
                            <b className="text-[30px] p-5">3.2M</b>
                        </div>
                    </div>
                    <div className="w-[250px] h-[150px] bg-white border rounded-xl mx-10">
                        <div>
                            <p className="p-5">Total Active Clints</p>
                            <b className="text-[30px] p-5">99.98%</b>
                        </div>
                    </div>
                    <div className="w-[250px] h-[150px] bg-white border rounded-xl mx-10">
                        <div>
                            <p className="p-5">Total Active Clints</p>
                            <b className="text-[30px] p-5">12</b>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-[850px] h-[350px] bg-white border rounded-xl mx-10 mt-10">
                        <p className="p-5">Interactions Over Time</p>
                        <b className="text-[40px] p-5">823,120</b>
                        <p className="p-5">Last 30 Days </p>
                    </div>
                    <div className="w-[350px] h-[350px] bg-white border rounded-xl mx-10 mt-10">
                        <p className="p-5">Interactions Brekdown</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainDashboard