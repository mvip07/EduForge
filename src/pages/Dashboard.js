
function DashboardContent() {
    return (
        <div className="p-8 bg-gray-300 w-full h-screen shadow ">
            <div>
                <h1 className="text-4xl font-normal">Client Companies</h1>
                <div className="flex">
                    <p className="mt-5">Manage monitor and configure all client accounts on the platform.</p>
                    <div className="flex justify-end w-full">
                        <button className="text-white bg-blue-500 py-3 px-4 ">+ Add New Company</button>
                    </div>
                </div>

                <div className="w-[1480px] h-[506px] bg-white font justify-center mt-5 rounded-xl container">
                    <div className="flex justify-between">
                        <input type="text" className="border w-[280px] p-2 mt-5 mx-5" placeholder="Search by company or admin" />
                        <div className="flex gap-4 me-5">
                            <div className="w-[100px] h-[40px] border mt-5">Status: All </div>
                            <div className="w-[200px] h-[40px] border mt-5">Sort by data added</div>
                        </div>
                    </div>
                    <div className="flex mt-5 mx-5">
                        <div className="w-[20px] h-[20px] rounded-full bg-white-50 border"></div>
                        <p className="mx-10">Company Name</p>
                        <p className="mx-20">Primary Admin</p>
                        <p className="mx-20"></p>
                        <p className="mx-20">Status</p>
                        <p className="mx-10">subscription plan</p>
                        <p className="mx-10">Data Added</p>
                        <p className="mx-10">Actions</p>
                    </div>
                    <hr />
                    <div className="flex mt-5 mx-5">
                        <div className="w-[20px] h-[20px] bg-white-50 rounded-full border"></div>
                        <p className="mx-10">Innovate Inc.</p>
                        <p className="mx-24">Sarah chen (sarah@innovate.com)</p>
                        <div className="mx-24 bg-green-100 py-2 px-3 rounded-full">Active</div>
                        <p className="mx-1">pro plan</p>
                        <div className="mx-3"></div>
                        <p className="mx-28">2023-10-26</p>
                        <p className="mx-5">:</p>
                    </div>
                    <hr />
                    <div className="flex mt-5 mx-5">
                        <div className="w-[20px] h-[20px] bg-white-50 rounded-full border"></div>
                        <p className="mx-10">Futuru Tech</p>
                        <p className="mx-28">Mark Robinson (mark@future.Tech)</p>
                        <div className="mx-16 bg-yellow-100 py-2 px-3 rounded-full">Trial</div>
                        <p className="mx-12">Enterprise</p>
                        <p className="mx-20">2023-10-24</p>
                        <p className="mx-14">:</p>
                    </div>
                    <hr />
                    <div className="flex mt-5 mx-5">
                        <div className="w-[20px] h-[20px] bg-white-50 rounded-full border"></div>
                        <p className="mx-10">Quantum Leap</p>
                        <p className="mx-24">Emily white (emil@quantom.com)</p>
                        <div className="mx-21 bg-green-100 py-2 px-3 rounded-full">Active</div>
                        <p className="mx-5">Basic plan</p>
                        <p className="mx-28">2023-10-22</p>
                        <div className="mx-2"></div>
                        <p className="">:</p>
                        <div className="mx-10"></div>
                    </div>
                    <hr />
                    <div className="flex mt-5 mx-5">
                        <div className="w-[20px] h-[20px] bg-white-50 rounded-full border"></div>
                        <p className="mx-10">Digital Dynamics</p>
                        <p className="mx-20">james lee (jamess@digital.dy)</p>
                        <div className="mx-30 bg-red-100 py-2 px-3 rounded-full">Inactive</div>
                        <p className="">pro plan</p>
                        <div className="mx-1"></div>
                        <p className="mx-28">2023-10-21</p>
                        <p className="mx-5">:</p>
                    </div>
                    <hr />
                    <div className="flex mt-5 mx-5">
                        <div className="w-[20px] h-[20px] bg-white-50 rounded-full border"></div>
                        <p className="mx-10">Synergy solutions</p>
                        <p className="mx-20">olivia green (olivia@synergy.sol)</p>
                        <div className="mx-24 bg-green-100 py-2 px-3 rounded-full">Active</div>
                        <p className="mx-5">Enterprise</p>
                        <div className="mx-1"></div>
                        <p className="mx-24">2023-10-20</p>
                        <p className="mx-9">:</p>
                    </div>
                    <hr />
                    <div className="flex justify-between w-full mt-5">
                        <p className="mx-20">Showing 1 to 5 of 97 results</p>
                        <div className="flex gap-4 mr-10">
                        <div className="w-[30px] h-[30px] bg-blue-500 text-white text-center">1</div>
                        <p>2</p>
                        <p>3</p>
                        <p>...</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardContent
