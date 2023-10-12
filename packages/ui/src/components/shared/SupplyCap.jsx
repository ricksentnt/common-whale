import React from 'react'

export default function SupplyCap({
  symbol,
  supply,
  supplyCap,
  supplyUsd
}) {
  return (
    <div tabIndex={0} className="radial-progress text-primary bg-primary-50"
      style={{ "--value": (supply / supplyCap) * 100, "--size": '1rem', "--thickness": '3px' }}
    />
  )
}
