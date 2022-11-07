<template>
    <div class="footer-area">
        <!-- FOOTER START -->
        <el-row class="">
            <el-col :span="20" :offset="2">
                <div>
                    <div class="tp-border"></div>
                    <div class="footer_bottom ">

                        <el-row>
                            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="24">

                                <p>Copyright &copy; 2021.Company name All rights reserved.<a target="_blank"
                                        href="https://sc.chinaz.com/moban/">&#x7F51;&#x9875;&#x6A21;&#x677F;</a>
                                </p>

                            </el-col>
                            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="24">
                                <div class="footer_right">
                                    <span>Follow us</span>
                                    <a href="#"><i class="fab fa-twitter"></i></a>
                                    <a href="#"><i class="fab fa-pinterest-p"></i></a>
                                    <a href="#"><i class="fab fa-vimeo-v"></i></a>
                                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                                </div>


                            </el-col>
                        </el-row>

                    </div>
                </div>
            </el-col>
        </el-row>

        <!-- FOOTER END -->
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.footer-area {
     /* background: #f9fdfa; */
    padding-top: 40px ;
    padding-top: 20px ;
 }

 .tp-border {
    border-top: 1px solid #e4ecee;
}

 .footer_bottom {
     color: var(--fontColor);
     padding: 20px 0;
     vertical-align: middle;
 }

 .footer_right {
     /* line-height: 40px; */
     vertical-align: middle;
 }
</style>