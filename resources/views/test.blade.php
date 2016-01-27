@extends('app')
{!! Html::image(URL::to('api').'/'.$id) !!}

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


I love horses and nothing is going to change that
Love me, love my horses
There's nothing more beautiful than woman and horses
Saying you own a hot sports car won’t excite us.