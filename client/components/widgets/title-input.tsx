import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { InputField } from '../input-field'

export function TitleInput() {
  const { control, setFocus } = useFormContext()

  return (
    <Controller
      name="title"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return '제목을 입력해주세요.'
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          autoFocus
          variant="fill"
          label="제목"
          placeholder="제목을 입력해주세요."
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => setFocus('title')}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  )
}
