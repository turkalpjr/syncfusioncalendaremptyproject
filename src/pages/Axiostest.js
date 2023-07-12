import React from 'react'
import { useState, useEffect } from 'react';
import { MenuItem, Select } from '@mui/material';
import axios from 'axios';
export const Axiostest = () => {
    const [TransferData, setTransferData] = useState([])
    const [ContactValue, setContactValue] = useState('')
    const handleChange = (event) => {
        debugger;
        setContactValue(event.target.value);
    };
    const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyNyIsInVuaXF1ZV9uYW1lIjoiQnVyY3UgQmFsY8SxIiwicm9sZSI6IkFnZW50IiwibmJmIjoxNjg5MTQzNDIzLCJleHAiOjE2ODk1NzU0MjMsImlhdCI6MTY4OTE0MzQyM30.6S6qgXJrOofkTun71tsc1xM8eCbJ901_08n8_Q3oTXJAhZfv1--89SThhYIO0n4xYp_q1ci2m_BGfaAf91RNiw";
    const TokenData = () => {
        debugger;
        axios.get('https://localhost:44342/api/status', { headers: { "Authorization": `Bearer ${token}` } }).then(function (res) {
            try {
                debugger;
                var result = res.data;
                console.log(result)
                setTransferData(result)
            }
            catch (error) {
                console.log(error)
            }
        })
    }
    useEffect(() => {
        TokenData()
    }, []);
    return (
        <>
            <Select
                labelId="Contact Select"
                fullWidth
                id="demo-simple-select"
                value={ContactValue}
                label='Select Contact'
                onChange={handleChange}>
                {TransferData?.map((data) => (
                    <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                ))}
            </Select>

        </>
    )
}
