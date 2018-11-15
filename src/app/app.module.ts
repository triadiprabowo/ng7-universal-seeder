import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { ConstantService } from './shared/services/constant.service';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'my-app' }),
		CommonModule,
		HttpClientModule,
		RouterModule.forRoot([
			{ path: '', loadChildren: './pages/index/index.module#IndexModule' }
		])
	],
	providers: [ConstantService],
	bootstrap: [AppComponent]
})
export class AppModule { }
