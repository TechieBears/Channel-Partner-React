import React, { useEffect, useState } from 'react'
import Aos from "aos";
import { Route, Routes } from "react-router-dom";
import Sidebar from '../src/components/sidebar/Sidebar';
import Dashbaord from './../src/pages/Dashbaord/Dashbaord';

const ProjectRoutes = () => {
    // const [lodingSpinner, setLodingSpinner] = useState()
    // const spinner = document.getElementById('lodingSpinner')

    // if (spinner) {
    //     setTimeout(() => {
    //         spinner.style.display = 'none';
    //         setLodingSpinner(true)
    //     }, 2000);
    // }
    useEffect(() => {
        Aos.init();
    }, []);

    return (
        <Sidebar>
            <Routes>
                <Route path="/" element={<Dashbaord />} />
                <Route path="/table" element={<Dashbaord />} />
            </Routes>
        </Sidebar>
    )
}

export default ProjectRoutes