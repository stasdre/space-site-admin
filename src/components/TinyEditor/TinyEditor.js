import { Editor } from '@tinymce/tinymce-react';

const TinyEditor = ({ value, onChange }) => {
  return (
    <Editor
      apiKey={process.env.TINY_KEY}
      initialValue={value}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             link image | \
             code | \
             bullist numlist outdent indent | removeformat | help',
      }}
      onEditorChange={onChange}
    />
  );
};

export default TinyEditor;
