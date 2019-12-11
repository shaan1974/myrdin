/*jshint sub:true*/
/*jslint evil: true */
/*
	EX
*/
template = function()
{
    /*

	   			{{!-- INLINE TEMPLATES START --}}

    			{{~ getSerial}}

    				FN : = OK... {{=serial_number}}. {{> customPrice }}

				{{/~}}

    			{{~ customPrice}}

    				_{{=price}} Eur.

				{{/~}}
				
    			{{~ fullName}}

    				"{{=firstname}}-{{=lastname}}"

				{{/~}}				

				{{!-- PARSE EXPRESSIONS --}}
				<p>
					<b>PARSE EXPRESSIONS:</b>

					{{? if list_contains( todo_list , 'BBB' ) ?}}
					<p>[todo_list CONTAINS 'BBB']</p><br/>
					{{? else ?}}
					<p>[todo_list NOT CONTAINS 'BBB']</p>
					{{? end if ?}}

					{{? if list_contains( todo_list , 'Dd' ) ?}}
					<p>[todo_list CONTAINS 'Dd']</p><br/>
					{{? else ?}}
					<p>[todo_list NOT CONTAINS 'Dd']</p>
					{{? end if ?}}					

					{{? if users[1].status EQ true ?}}
					<p>[users[1].status EQ true]</p><br/>
					{{/? if ?}}

					{{?if simple_data_object.lastname EQ "waza" ?}}
					<p>[simple_data_object.lastname EQ waza]</p><br/>
					{{? end if ?}}

					{{? If contains( serial_number , 'BBB' ) ?}}
					<p>[SERIALNUMBER CONTAINS 'BBB' STRING]</p><br/>
					{{? end if ?}}

					{{? if concat( serial_number , '-DDD' ) EQ 'AAA-BBB-CCC-DDD' ?}}
					<p>[SERIALNUMBER CONCAT IS AT THE END 'AAA-BBB-CCC-DDD']</p><br/>
					{{? end if ?}}

					{{? if concat( cast_to( 'STRING' , math( score * 50 ) , " Eur" ) ) EQ "350 Eur" ?}}
					<p>[SCORE MULTIPLY BY 50 IS 350]</p><br/>
					{{? end if ?}}

					{{? if cast_to( 'INTEGER' , price2 ) EQ 349 ?}}
					<p>[PRICE 2 CAST TO INTEGER  IS 349]</p><br/>
					{{? end if ?}}
					
					{{? if cast_to( 'INTEGER' , price2 , 'ceil' ) EQ 350 ?}}
					<p>[PRICE 2 CAST TO INTEGER  IS 349 CEIL IS 350 ]</p><br/>
					{{? end if ?}}
							
					{{? if cast_to( 'FLOAT' , price2 , '2' ) EQ 349.10 ?}}
					<p>[PRICE 2 CAST TO FLOAT TO FIX 2 349.10 ]</p><br/>
					{{? end if ?}}

					{{? if array_to_list( data_array ) EQ 'Ax,Bx,Cx' ?}}
					<p>[array_to_list ]</p><br/>
					{{? end if ?}}

					{{? if array_are_equal( list_to_array( todo_list ) , ['Aa','Bb','Cc','Dd','Ee'] ) ?}}
					<p>[array_are_equal ]</p><br/>
					{{? end if ?}}

					{{? if date_diff( moment_date( creation_date , 'DD-MM-YYYY' ) ,  moment_date( update_date , 'DD-MM-YYYY' ) , 'days' )  LT 7 ?}}
					<p>[date_diff creation_date and update_date &lt; 7 ]</p><br/>
					{{? end if ?}}

					{{? if array_indexof( data_array , 'Bx' ) EQ 1 ?}}
					<p>[data_array position 2 = 'Bx' ]</p><br/>
					{{? end if ?}}

					{{? if in_array( data_array , 'Bx' )  ?}}
					<p>['Bx' in is Array ]</p><br/>
					{{? end if ?}}
					
				</p>
				
				{{!-- FILTERS --}}

				<p>
					<b>FILTERS:</b>
					<p>Uniq,Join [ {{=data_array | uniq|join}} ]</p>
					<p>Total={{=total}} inc [ {{=total | increment}} ]</p>
					<p>Uniq,Join [ {{=data_array | uniq|join '-' }} ]</p>
					<p>split,Join [ {{=serial_number | split "-"|join "," }} ]</p>
					<p>split,Join [ {{=serial_number | slice "4" "-4"}} ]</p>
					<p>date Format [ {{=creation_date | dateFormat "DD-MM-YYYY" "MMMM D,dd YYYY"}} ]</p>
					<p> Number Format [ {{=payment | formatNumber}} ]</p>
					<p> Number Currency [ {{=payment | formatCurrency}} ]</p>
					<p> Date Add [ {{=creation_date | dateAdd "DD-MM-YYYY" "1" "d" "LLLL"}} ]</p>
					<p> Date Substract [ {{=creation_date | dateSubstract "DD-MM-YYYY" "1" "d" "LLLL"}} ]</p>
					<p>Truncate safe : <div style='background-color:blue;'>{{=comment |safe | truncate '100' 'true' '___'}}</div></p>
					<p>Truncate not safe : <div style='background-color:green;'>{{=comment | truncate '100' 'true' '___'}}</div></p>
					<p>Sqrt {{=number1 | sqrt}}</p>
					<p>Pow {{=number1 | pow '2'}}</p>
					<p>To Fixed {{=payment | to_fixed '2'}} , not fixed : {{=payment}}</p>
					<p>Hyphenate : {{=sentense | hyphenate}}</p>
				</p>


				{{!-- VARS --}}
				<p>
					<b>VARS:</b>

					<p>Aka Users Index 0 Aka : "{{=data_array[0]}}"</p>
					<p>Aka Users Index 0 Aka : "{{=users[0].aka}}"</p>

					<p>[Date courante : '{{=@now}}' ]</p>
					<p>[Année en cours : '{{=@year}}' ]</p>
				
				</p>
				
				{{!-- CALL INLINE TEMPLATE --}}

				<p>
					<b>INLINE TEMPLATE - getSerial</b>
					({{> getSerial }})
				</p>

				{{!-- RAW --}}
				<p class="raw">
				{{% raw %}}
					
					{{test}} - {{test2}} stéphane
					123..
					456...

				x{{%/raw%}}				
				</p>
								
				{{!-- HELPERS --}}

				<p>MATCH FINAL: "{{^math 'total + score'}}"</p>

				<p>NOW custom format: "{{^now 'DD-MM-YYYY HH:mm:ss'}}"</p>
				<p>NOW config format: "{{^now}}"</p>
				<p>UUID: "{{^uuid}}"</p>
				<p>_DATE DIFF: (04-01-1986)-(31-12-1985) "{{^date_diff update_date , 'DD-MM-YYYY' , creation_date , 'DD-MM-YYYY' , 'days' }}"</p>

				<b>LOOP:</b>
				{{!-- LOOP --}}
        		<ul>
        		{{# each users #}}
        			
        			<li>
						
						{{? if @first ?}}
						<p>_FIRST_ELM_</p>
						{{? end if ?}}					

						{{? if @last ?}}
						<p>_LAST_ELM_</p>
						{{? end if ?}}					

						{{? if @index EQ 1 ?}}
						<p>_SECOND_ELEMENT_</p>
						{{? end if ?}}					

						{{? if @odd ?}}
						_ODD_
						{{? end if ?}}					

						{{? if @even ?}}
						_EVEN_
						{{? end if ?}}		
						
						<div style="background-color:yellow">
								[{{=@index}}] - firstname : {{=firstname}} , Lastname : {{=lastname}} , Serial Number : {{=./serial_number }}
						</div>
						
						<div style="background-color:green;color:#fff">
							<p>
								SERIAL:
								{{? if ../serial_number EQ 'AAA-BBB-CCC' ?}}
									SERIAL _OK_
								{{? else ?}}
									SERIAL _NOT_OK_
								{{? end if ?}}
							</p>

							<p>
								DT[0] EQ "Ax"
								{{? if ./data_array[0] EQ 'Ax' ?}}
									 _OK_
								{{? else ?}}
									_NOT_OK_
								{{? end if ?}}	
							</p>
							
							<p>
								{{? if is_empty( aka ) ?}}
								NO AKA.
								{{? else ?}}
								Aka : {{=aka}}
								{{? end if ?}}	
							</p>						
						</div>


						<p> {{=@index}} : "{{=firstname}}" - "{{=firstname|safe}}"- "{{=firstname|safe|uppercase}}" - "{{=firstname|uppercase}}"</p> 
						<p>({{> fullName }})</p>
						<p>Concat _{{^concat firstname , ' ' , lastname}}_</p>
						<p>{{=./payment}}</p>
						<p>{{=./simple_data_object.lastname}}</p>
						<p>{{=../payment}}</p>
						<p>{{=../data_array[0]}}</p>

    					{{? if len( lastname ) EQ 8 ?}}
    					<p>"{{=lastname}}" => [LENGHT LASTNAME = 8]</p>
    					{{? end if ?}}

    					{{? if binarylen( lastname ) EQ 9 ?}}
    					<p>"{{=lastname}}" => [BINARY LENGHT LASTNAME = 9]</p>
    					{{? end if ?}}
												
    					{{? if startsWith( lastname , 'Jo' ) ?}}
    					<p>[LASTNAME STARTSWITH 'JO']</p>
    					{{? end if ?}}

    					{{? if endsWith( lastname , 'icus' ) ?}}
    					<p>[LASTNAME ENDSWITH 'icus']</p>
    					{{? end if ?}}

    					{{? if inRange( amount , '15' , '25' ) ?}}
    					<p>[AMOUNT IS BETWEEN 15 AND 25]</p>
						{{? end if ?}}
						
						<p>
							<b>STATUS :</b>
							{{? if status EQ false ?}}
								_DISABLED_
							{{? else ?}}
								_ENABLED_
							{{? end if ?}}

							{{? if status ?}}
								_ENABLED2_
							{{? else ?}}
								_DISABLED2_
							{{? end if ?}}

							{{? if NOT status ?}}
								_DISABLED3_
							{{? else ?}}
								_ENABLED3_
							{{? end if ?}}

						</p>						

						<p>
							Language(s):
        					<ul>
	        					{{# each lang #}}
        						<li>{{=lang}} , level = [{{=level}}/5] <input type="text" value="{{=level}}"></li>
        						{{# end each #}}
							</ul>						
						</p>

						<p>
        					Details:
        					<br/>
        					<ul>
	        					{{# with details #}}
								<li>
									BIRTHDATE: {{=birtdate}}), PLACE: {{=place}}

        							<br/>
									Citie(s):
        							<ul style="background-color:#eaeaea">
	        							{{# each cities #}}
										<li>
											<p>PARENTS-NDX: [ {{=../@index}} ]</p>
											<p>NDX: [ {{=@index}} ]</p>
											<p>Name: {{=name}}</p>
											<p>Name: <input type="text" value="{{=name}}"></p>
											<p>Root Data Array[0]: {{=./data_array[0]}}</p>
        									<p>Root Serial Number : {{=./serial_number}}</p>
        									<p>Root Simple_d_o.firstname: {{=./simple_data_object.firstname}}</p>
											<p>Parent Place : {{=../place}}</p>
											<p>Parent,Parent Firstname: {{=../../firstname}}</p>
        									<p>Parent,Parent Firstname with Filter Ucase: {{=../../firstname | uppercase}}</p>
        								</li>
        								{{# end each #}}
									</ul>									
        						</li>
        						{{# end with #}}
							</ul>
						</p>


					</li>

				{{# end each #}}
				</ul>						

				<ul>		
				{{# each data_array #}}
					
					<li>
						<p>({{=@index}})"{{=.}}"</p>
						<p>
							ODD OR EVENT:
							{{? if @odd EQ true ?}}
								_ODD_
							{{? else ?}}
								_EVEN_
							{{? end if ?}}
						</p>

					</li>
					
				{{/# each #}}
				</ul>		
				
				<hr/>
				
				<p>
					LESSON with If
					{{? if lesson EQ "French" ?}}
						<p>French Lesson__.</p>
					{{? eLse if lesson EQ "English" ?}}
						<p>English Lesson__.</p>
					{{? end if ?}}
				</p>	

				<hr/>
				
				<p>
					{{? if len(todo_list2) === 0 ?}}
					<p><b>NO element in todo_list2</b></p>
					{{? end if ?}}

					{{? if len(todo_list3) === 0 ?}}
					<p>NO element in todo_list3 with len function</p>
					{{? end if ?}}

					{{? if is_empty(todo_list3) ?}}
					<p>NO element in todo_list3 With is_empty function</p>
					{{? end if ?}}
				</p>		
				
				<hr/>

				CUSTOM TODO LIST
				<ul>		
					{{# list todo_list #}}
					<li>
						{{? if @first ?}}<p>_FIRST_ELM_</p>{{? end if ?}}
						<p>({{=@index}})"{{=.}}"</p>
						{{? if @last ?}}<p>_LAST_ELM_</p>{{? end if ?}}

						{{? if . EQ 'Cc' ?}}
							<p>[SECOND because equal to 'Cc']</p>
						{{? else ?}}
							<p>[NOT SECOND]</P>
						{{? end if ?}}

						<div>
							<b>MATH</b>

							{{? if math( 1+1 ) EQ 2 ?}}
								<p>1+1 = 2</p>
							{{? end if ?}}

							{{? if math( 2*1 ) EQ 2 ?}}
								<p>2*1 = 2</p>
							{{? end if ?}}

							{{? if math( @index+1 ) EQ 2 ?}}
								<p>CALC : exp 'math( @index+1 ) EQ 2' => [{{=@index}}+1] = 2</p>
							{{? else ?}}
								<p>CALC : exp 'math( @index+1 ) EQ 2' => [{{=@index}}+1] != 2</p>
							{{? end if ?}}

						</div>

					</li>
					{{# end list #}}
				</ul>	
				
				<hr/>

				<b>CUSTOM TODO LIST BIS- ASC</b>
				<ul>		
					{{# list todo_list 'ASC' #}}
					<li>
					<p>({{=@index}})"{{=.}}"</p>
					</li>
					{{# end list #}}
				</ul>	

				<b>CUSTOM TODO LIST TRI - DESC</b>
				<ul>		
					{{# list todo_list 'DESC' #}}
					<li>
					<p>({{=@index}})"{{=.}}"</p>
					</li>
					{{# end list #}}
				</ul>					

				<hr/>

				<p>
						<b>TRAINING #1</b>
						<ul>
						{{# every trainings #}}
							
							<li>{{=trainer}}</li>
						
						{{# otherwise #}}

							<li>Sorry no trainings now.</li>
										
						{{# end every #}}
						</ul>
				</p>				

				<p>
						<b>TRAINING #2</b>
						<ul>
						{{# every trainings2 '-trainer' #}}
							
							<li>{{=trainer}}</li>
						
						{{# otherwise #}}

							<li>Sorry no trainings now.</li>
										
						{{# end every #}}
						</ul>
				</p>	
				
				<p>
					<b>EVERY ON ARRAY</b>
					<ul>
				
					{{# every data_array #}}
						
						<li>{{=.}}</li>
					
					{{# otherwise #}}

						<li>Sorry no data_array now.</li>
									
					{{/# every #}}
					</ul>				
				</p>
				
				<p>
				<b>FOR ()</b>
        		<ul>		
					{{# for (fruit, color) in details_fruits #}}

						<li>
							Name : {{=fruit}} , color : {{=color}}
						</li>
						
					{{# end for #}}
				</ul>					
				</p>

				<p>
					<b>SWITCH</b>
					<br/>
					LESSON with Switch-Case
					<br/>
					{{? switch lesson ?}}

						{{? case "French" ?}}
							<p>French Lesson.</p>
						{{? end case ?}}

						{{? case "English" ?}}
							<p>English Lesson.</p>
						{{? end case ?}}

						{{? default ?}}
							<p>Other language</p>
						{{/? default ?}}
						
					{{? end switch ?}}

					<br/>
					LESSON2 with Switch-Case
					<br/>
					{{? switch lesson2 ?}}

						{{? case "French" ?}}
							<p>French Lesson.</p>
						{{/? case ?}}

						{{? case "English" ?}}
							<p>English Lesson.</p>
						{{? end case ?}}

						{{? default ?}}
							<p>Other language '  {{=lesson2}}  '.</p>
						{{? end default ?}}
						
					{{/? switch ?}}

				</p>	
				
				{{!-- LOOP --}}
				<table border="1">
					<tr>
						<td>City</td>
						<td>Price</td>
						<td>Zip</td>
					</tr>
					{{# each home 'city','-price' #}}
						
						<tr>
							<td>{{=city}}</td>
							<td>{{=price}}</td>
							<td>{{=zip}}</td>
						</tr>

					{{# end each #}}
				</table>

				<hr/>

				Notes avg (internal one) = {{=notes |avg}}
				<br/>
				Notes avg (added) = {{=notes |avg2}}

				<hr/>
				<br/>
				<b>Expressions: </b>

				{{? if is_array( notes) ?}}
				<p>Notes variable is Array_type</p>
				{{? end if ?}}				
								
				{{? if item_pos_in_array( notes , 2 , 3 ) ?}}
				<p>Notes pos 2 EQ 3</p>
				{{? end if ?}}				

				{{? if item_pos_in_array( data_array , 0 , 'Ax' ) ?}}
				<p>data_array pos 0 EQ 'Ax'</p>
				{{? end if ?}}				

				{{^debug notes}}
				{{^debug 'context'}}

					
   	*/
}.toString().trim();

//	DEDICATE
template = template.replace(/^function\(\)\s+{\s*\/\*/, "");
template = template.replace(/\*\/\s*\}$/, "");