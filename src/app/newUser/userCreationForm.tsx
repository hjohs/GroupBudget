'use client'

export default function UserCreationForm() {

    function handleSubmit() {
        return;
    }

    return (
        <div className="flex flex-col justify-center text-center">
            <h2 className="mb-3 text-xl font-bold">Create Account</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col w-[20%] justify-center mx-auto border-5 rounded-xl p-5">
                <input type="text" id="username" name="username" placeholder="Username" className="border-2 rounded-sm pl-2 h-10 mb-2"/>
                <input type="text" id="password" name="password" placeholder="Password" className="border-2 rounded-sm pl-2 h-10 mb-2"/>
                <button type="submit" className="border-2 rounded-sm h-10 hover:bg-slate-200">Submit</button>
            </form>
        </div>
    )
}