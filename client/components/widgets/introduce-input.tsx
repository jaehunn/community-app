import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { InputField } from '../input-field'

export function IntroduceInput() {
  const { control } = useFormContext()

  return (
    <>
      <Controller
        name="introduce"
        control={control}
        render={({ field: { ref, onChange, value } }) => (
          <InputField
            ref={ref}
            variant="fill"
            label="소개"
            placeholder="소개를 입력해 주세요."
            returnKeyType="next"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
    </>
  )
}
