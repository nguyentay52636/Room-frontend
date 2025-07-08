import { getAllProperties } from '@/lib/apis/propertiesApi';
import { BatDongSan, features } from '@/lib/apis/types';
import React, { useEffect, useState } from 'react'

export default function TestProperties() {
    const [properties, setProperties] = useState<BatDongSan[]>([]);
    useEffect(() => {
        const fetchProperties = async () => {
            const properties = await getAllProperties();
            setProperties(properties);
        }
        fetchProperties();
    }, []);
    return (
        <div>
            {properties.map((property) => (
                <div key={property._id}>
                    <h1>{property.tieuDe}</h1>
                    <p>{property.moTa}</p>
                    <p>{property.gia}</p>
                    <p>{property.diaChi}</p>
                    <p>{property.tinhThanh}</p>
                    <p>{property.quanHuyen}</p>
                    <p>{property.dienTich}</p>
                    <p>{property.phongNgu}</p>
                    <p>{property.phongTam}</p>
                    <p>{property.choDauXe}</p>
                    <p>{property.trangThai}</p>
                    <p>{property.features.map((feature: features) => feature.text)}</p>
                    <p>{property.badge}</p>
                    <p>{property.subtitle}</p>
                </div>
            ))}
        </div>

    )
}
