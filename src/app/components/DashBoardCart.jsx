"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 7000 },
    { month: "May", sales: 6000 },
]

export default function DashboardChart() {
    return (
        <div className="w-full h-80 p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Chiffre d&apos;affaires</h2>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
        </ResponsiveContainer>
        </div>
    )
}
