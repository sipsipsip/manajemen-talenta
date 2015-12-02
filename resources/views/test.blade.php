@extends('app')


@section('footer_scripts')

    <script>
        $(function(){

            $.ajax({
                method: 'GET',
                url: 'http://localhost:3000/kantor/adapter/public/api/v1/data?model=jabatan',
                cache: false,
                success: function(res){
                    console.log('berhasil');
                    console.log(res.data);
                },
                error: function(){
                    alert('error');
                }
            })
        });
    </script>
@endsection